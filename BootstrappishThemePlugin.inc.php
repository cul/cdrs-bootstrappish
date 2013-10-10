<?php

/**
 * @file BootstrappishThemePlugin.inc.php
 *
 * Copyright (c) 2013 Christopher Anderton
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @class BootstrappishThemePlugin
 * @ingroup plugins_themes_bootstrappish
 *
 * @brief "Bootstrappish" theme plugin
 */

//$Id$

import('classes.plugins.ThemePlugin');

class BootstrappishThemePlugin extends ThemePlugin {
	/**
	 * Get the name of this plugin. The name must be unique within
	 * its category.
	 * @return String name of plugin
	 */
	function getName() {
		return 'BootstrappishThemePlugin';
	}

	function getDisplayName() {
		return 'Bootstrappish Theme';
	}

	function getDescription() {
		return 'Remaps twitter Bootstrap to fit PKP without modifying templates';
	}

	function getStylesheetFilename() {
		return 'bootstrap.css';
	}

	function getLocaleFilename($locale) {
		return null; // No locale data
	}

	/**
	 * Add a page-specific script.
	 *
	 * Note: Implementing for OCS v2.5.3 support
	 *
	 * @param $url string the URL to be included
	 */
	function addJavaScript(&$templateMgr, $url) {

		$extra_js = '<script type="text/javascript" src="' . Request::getBaseUrl() . '/' . $url . '"></script>';
		$templateMgr->assign('additionalHeadData', $additionalHeadData . "\n" . $extra_js);
	}

	/**
	 * Activate the theme.
	 */
	function activate(&$templateMgr) {

		// Add in jQuery from CMS
		$jQueryCMS = '	<script language="javascript" type="text/javascript" src="http://code.jquery.com/jquery.js"></script>';
		$additionalHeadData = $templateMgr->get_template_vars('additionalHeadData');
		$templateMgr->assign('additionalHeadData', $additionalHeadData."\n".$jQueryCMS);

		// Method addJavaScript doesn't exists on OCS v2.3.5. 
		// Not even the javascript array as in the case of stylesheets
		$object_aux = ( method_exists($templateMgr, 'addJavaScript') ) ? $templateMgr : $this;

		// Add in Bootstrap JS
		$object_aux->addJavaScript($templateMgr, 'plugins/themes/bootstrappish/js/bootstrap.min.js');

		// Add in custom JS scripts to hold miscellany
		$object_aux->addJavaScript($templateMgr, 'plugins/themes/bootstrappish/js/custom.js');
		
		if (($stylesheetFilename = $this->getStylesheetFilename()) != null) {
			$path = Request::getBaseUrl() . '/' . $this->getPluginPath() . '/css/' . $stylesheetFilename .'?bootstrappish';
			$templateMgr->addStyleSheet($path);
		}


	}
}
?>