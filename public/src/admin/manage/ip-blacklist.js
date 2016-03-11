'use strict';
/* globals $, app, socket */

define('admin/manage/ip-blacklist', ['settings'], function(Settings) {

	var Blacklist = {};

	Blacklist.init = function() {
		var blacklist = ace.edit("blacklist-rules");

		blacklist.on('change', function(e) {
		    $('#blacklist-rules-holder').val(blacklist.getValue());
		}); 

		Settings.load('blacklist', $('.blacklist-settings'), function(err, settings) {
			blacklist.setValue(settings.rules);
		});

		$('[data-action="apply"]').on('click', function() {
			Settings.save('blacklist', $('.blacklist-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'blacklist-saved',
					title: 'Blacklist Applied',
				});
			});
		});
	};

	return Blacklist;
});