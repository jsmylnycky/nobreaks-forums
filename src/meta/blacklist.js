'use strict';

var ip = require('ip');

var Blacklist = {
		_rules: [],
		_stats: []
	};

Blacklist.validate = function(rules, callback) {
	var rules = rules.split('\n'),
		invalid = [];

	var isCidrSubnet = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$/;

	// Filter out blank lines and lines starting with the hash character (comments)
	rules = rules.map(function(rule) {
		rule = rule.trim();
		return rule.length && !rule.startsWith('#') ? rule : null;
	}).filter(Boolean);

	// Filter out invalid rules
	rules = rules.filter(function(rule) {
		if (!ip.isV4Format(rule) && !isCidrSubnet.test(rule)) {
			invalid.push(rule);
			return false;
		}

		return true;
	});

	callback(null, {
		numRules: rules.length + invalid.length,
		valid: rules,
		invalid: invalid
	});
};

module.exports = Blacklist;