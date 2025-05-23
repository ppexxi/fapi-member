<?php

namespace FapiMember\Utils;

final class DisplayHelper {


	/**
	 * @param string              $hasSectionOrLevel
	 * @param string|array<mixed> $fapiSectionAndLevels
	 * @return bool
	 */
	public static function shouldContentBeRendered( $hasSectionOrLevel, $fapiSectionAndLevels ) {
		if ( ! in_array( $hasSectionOrLevel, array( '1', '0', '' ), true ) ) {
			return true;
		}

		if ( $hasSectionOrLevel === '' ) {
			return true;
		}

		if ( ! isset( $fapiSectionAndLevels ) ) {
			return true;
		}

		if ( is_string( $fapiSectionAndLevels ) ) {
			$sectionAndLevels = json_decode( $fapiSectionAndLevels, true );
		} elseif ( is_array( $fapiSectionAndLevels ) ) {
			$sectionAndLevels = $fapiSectionAndLevels;
		} else {
			return true;
		}

		if ( $sectionAndLevels === array() ) {
			return true;
		}

		$sectionAndLevels = array_map(
			static function ( $item ) {
				return (int) $item;
			},
			$sectionAndLevels
		);

		global $FapiPlugin;
		$hasMemberSectionOrLevel = (string) $hasSectionOrLevel;
		$memberships             = $FapiPlugin->fapiMembershipLoader()->loadForUser( get_current_user_id() );

		if ( $hasMemberSectionOrLevel === '1' ) {
			foreach ( $memberships as $membership ) {
				if ( in_array( $membership->level, $sectionAndLevels, true ) ) {
					return true;
				}
			}

			return false;
		}

		if ( $memberships === array() ) {
			return true;
		}

		foreach ( $memberships as $membership ) {
			if ( ! in_array( $membership->level, $sectionAndLevels, true ) ) {
				return true;
			}
		}

		return false;
	}

}
