var totalQueuedItems;
var currentQueuedItem;
var currentQueuedData;
var currentQueuedUserApplyMatrix;
var createdUsers;
var friendships;

function loadAllUserInfo() {
	$('.user_list ul').children('li').each(function(index) {
	    var id = $(this).find('.id').first().html();
	    var token = $(this).find('.token').first().html();
	    loadUserInfo(id, token);
	});
}

function loadUserInfo(uid, token) {
	if(!$('#user_' + uid).hasClass('loaded')) {
		$('#user_' + uid).parent().addClass('loading');
	    $.ajax({
	        url: "ajax-userinfo",
	        type: "POST",
	        data: {
	            uid: uid,
	            token: token
	        },
	        success: function(response) {
	            var r = $.parseJSON(response);
	            $('#userInfoTpl').tmpl(r.data).appendTo('#user_' + r.data.uid);
	            $('#user_' + r.data.uid).addClass('loaded')
	            						.parent().removeClass('loading');
	        },
	        error: function(response) {
	        	var r = $.parseJSON(response.responseText);
	        	$('#user_' + uid).addClass('loaded')
	        					 .html('Error: ' + r.message)
	        					 .parent().removeClass('loading');
	        }
	    });
	}
}

function submitNewUserForm() {
	var data = {
		permissions: $('#permissions').val(),
		installed: $('input:radio[name=installed]:checked').val()
	}
	
	totalQueuedItems = parseInt($('#quantity').val());
	currentQueuedItem = 0;
	currentQueuedData = data;
	currentQueuedUserApplyMatrix = $('input:radio[name=matrix]:checked').val() == 1;
	createdUsers = [];
	
	openLoading();
	createUser();
}

function createUser() {
	var append = (createdUsers.length > 0);
	$.ajax({
	   url: "ajax-create",
	   type: "POST",
	   data: currentQueuedData,
	   success: function(response) {
	       var r = $.parseJSON(response);
	       createdUsers[createdUsers.length] = r.data;
	       openSuccess(r.message, append);
	       createUserHandler();
	   },
	   error: function(response) {
	       var r = $.parseJSON(response.responseText);
	       openError(r.message, append);
	       //createUserHandler();
	   }
	});
}

function createUserHandler() {
	currentQueuedItem++;
	if(currentQueuedItem < totalQueuedItems) {
		createUser();
	} else {
		openSuccess('Done.', true);
		totalQueuedItems = null;
		currentQueuedItem = null;
		currentQueuedData = null;
		if(currentQueuedUserApplyMatrix) {
			//Add relationships to friends latest first
			createdUsers.reverse();
			applyFriendshipMatrixToUsers(createdUsers);
		} else {
			//redirect('list');
		}
	}
}

function deleteAllUsers() {
	$('.user_list ul').children('li').each(function(index) {
	    var id = $(this).find('.id').first().html();
	    var token = $(this).find('.token').first().html();
	    deleteUser(id, token, true);
	});
}

function deleteUser(uid, access_token, ajax) {
	$('#user_' + uid).parent().addClass('loading');
    if(ajax) {
    	$.ajax({
		   url: "ajax-delete",
		   type: "POST",
		   data: {
			   del_user: uid,
			   del_user_token: access_token
		   },
		   success: function(response) {
		       var r = $.parseJSON(response);
		       if(r.code == 200) {
		    	   openSuccess(r.message);
			       $('#user_' + uid).parent().parent().remove();
		       } else {
		    	   openError(r.message);
		       }
		   },
		   error: function(response) {
		       var r = $.parseJSON(response.responseText);
		       openError(r.message);
		   }
		});
    } else {
    	$('#del_user').val(uid);
        $('#del_user_token').val(access_token);
        $('#delete_user_form').submit();
    }
}

function addFriend(origin_id, access_token) {
    renderFriendList(origin_id, access_token);
    loadFriendDropDown();
    $('#origin_user').val(origin_id);
    $('#origin_user_token').val(access_token);
    $("#add_friend").data().overlay.load();
}

function submitAddFriend() {
	$("#add_friend").data().overlay.close();
    openLoading();
    
    var data = {
        origin_user: $('#origin_user').val(),
        origin_user_token: $('#origin_user_token').val(),
        target_user: $('#target_user').val()
    }

    $.ajax({
        url: "ajax-add-friend",
        type: "POST",
        data: data,
        success: function(response) {
            var r = $.parseJSON(response);
            openSuccess(r.message);
        },
        error: function(response) {
            var r = $.parseJSON(response.responseText);
            openError(r.message);
        }
    });
}

function applyFriendshipMatrixToUsers(users) {
	friendships = getFriendshipsFromMatrixMap(users);
	if(friendships.length > 0) {
		totalQueuedItems = friendships.length;
		currentQueuedItem = 0;
		
		//drawFriendshipMatrixTable();
		
		createFriendship();
	}
}

function createFriendship() {
	var append = (currentQueuedItem > 0);
	currentQueuedData = {
		origin_user:friendships[currentQueuedItem].origin_user,
		origin_user_token:friendships[currentQueuedItem].origin_user_token,
		target_user:friendships[currentQueuedItem].target_user + " " + friendships[currentQueuedItem].target_user_token
	};
	
	$.ajax({
	   url: "ajax-add-friend",
	   type: "POST",
	   data: currentQueuedData,
	   success: function(response) {
	       var r = $.parseJSON(response);
	       openSuccess(r.message, append);
	       createFriendshipHandler();
	   },
	   error: function(response) {
	       var r = $.parseJSON(response.responseText);
	       openError(r.message, append);
	       createFriendshipHandler();
	   }
	});
}

function createFriendshipHandler() {
	currentQueuedItem++;
	if(currentQueuedItem < totalQueuedItems) {
		createFriendship();
	} else {
		openSuccess('Done.', true);
		friendships = null;
		createdUsers = null;
		totalQueuedItems = null;
		currentQueuedItem = null;
		currentQueuedData = null;
		//redirect('list');
	}
}

function drawFriendshipMatrixTable() {
	var table = $("table");
	var tr;
	for(var i = 0;i < createdUsers.length;i++) {
		tr = $("tr");
		for(var ii = 0;ii < createdUsers.length;ii++) {
			tr.append($("td"));
		}
		table.append(tr)
	}
	$('#friendship_matrix').append(table);
    $("#friendship_matrix").data().overlay.load();
}

function getFriendshipsFromMatrixMap(users) {
	var noOfUsers = users.length;
	var origin_user;
	var friends;
	var token;
	var friendships = [];
	for(var i = 0;i < noOfUsers;i++) {
		origin_user = createdUsers[i].id;
		friends = matrix[i];
		for(var ii = 0;ii < friends.length;ii++) {
			friendships[friendships.length] = {
				origin_user: origin_user, 
				origin_user_token: createdUsers[i].access_token, 
				target_user: createdUsers[friends[ii]].id, 
				target_user_token: createdUsers[friends[ii]].access_token
			}
		}
	}
	return friendships;
}

function loadFriendDropDown() {
    $('#target_user').empty();
    $('.user_list ul').children('li').each(function(index) {
        var id = $(this).find('.id').first().html();
        var token = $(this).find('.token').first().html();
        var name = $('#user_' + id).find('.name').html();
        name = (name == null) ? id : name;
        $('#target_user').append('<option value="' + id + " " + token + '">' + name + '</option>');
    });
}

function renderFriendList(uid, token) {
    $('#friend-list').empty();
    $('#friend-list').append('<li class="loading"><img src="images/loading-small.gif" alt=""></li>');

    $.ajax({
        url: "ajax-user-friends",
        type: "POST",
        data: {
            uid: uid,
            token: token
        },
        success: function(response) {
            var r = $.parseJSON(response);
            $('#friend-list').empty();

            $.each(r.data,
            function(index, value) {
                $('#friend-list').append('<li>' + value.name + '</li>');
            });

        }
    });
}

function addApp() {
    $("#add_app").data().overlay.load();
}

function showAppLogin(url) {
    $('#view_app_login_p').html(url);
    $("#view_app_login").data().overlay.load();
}

function submitAddApp() {
	$("#add_app").data().overlay.close();
    openLoading();
    
    var data = {
        app_name: $('#app_name').val(),
        app_id: $('#app_id').val(),
        facebook_app_id: $('#facebook_app_id').val(), 
        facebook_app_secret: $('#facebook_app_secret').val()
    }

    $.ajax({
        url: "ajax-add-app",
        type: "POST",
        data: data,
        success: function(response) {
            var r = $.parseJSON(response);
            openSuccess(r.message);
        },
        error: function(response) {
            var r = $.parseJSON(response.responseText);
            openError(r.message);
        }
    });
}

function deleteApp(key, id) {
	$('#app_' + id).parent().addClass('loading');
	$.ajax({
	   url: "ajax-delete-app",
	   type: "POST",
	   data: {
		   del_user_key: key,
		   del_user_id: id
	   },
	   success: function(response) {
	       var r = $.parseJSON(response);
	       if(r.code == 200) {
	    	   openSuccess(r.message);
		       $('#app_' + id).parent().parent().remove();
	       } else {
	    	   openError(r.message);
	       }
	   },
	   error: function(response) {
	       var r = $.parseJSON(response.responseText);
	       openError(r.message);
	   }
	});
}

function initListOverlays() {
    $("#view_token").overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.7
        },
        closeOnClick: false,
    });

    $("#loading").overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.7
        },
        closeOnClick: false,
    });

    $("#success").overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.7
        },
    });

    $("#error_modal").overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.7
        },
    });

    $('#add_friend').overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.7
        },
        closeOnClick: false,
    });
    
    $('#add_app').overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.7
        },
        closeOnClick: false,
    });
    
    $('#view_app_login').overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.7
        },
        closeOnClick: false,
    });
    
    $('#friendship_matrix').overlay({
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.7
        },
        closeOnClick: false,
    });
}

function initTooltips() {
    $(".cmds a[title]").tooltip();
}

function showToken(token) {
    $('#view_token_p').html(token);
    $("#view_token").data().overlay.load();
}

function openLoading() {
    $("#loading").data().overlay.load();
}

function closeLoading() {
    $("#loading").data().overlay.close();
}

function openSuccess(msg, append) {
	if (append == undefined || !append) {
		$('#success > .message').html(msg);
	} else {
		$('#success > .message').append("<br/>" + msg);
	}
    $("#success").data().overlay.load();
}

function openError(msg, append) {
	if (append == undefined || !append) {
		$('#error_modal > .message').html(msg);
	} else {
		$('#error_modal > .message').append("<br/>" + msg);
	}
    $("#error_modal").data().overlay.load();
}

function redirect(url) {
	window.location = url;
}