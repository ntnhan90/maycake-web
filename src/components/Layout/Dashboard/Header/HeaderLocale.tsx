'use client'

import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavLink,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe} from '@fortawesome/free-solid-svg-icons'
import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import HeaderLocaleSelect from './HeaderLocaleSelect';

export default function HeaderLocale() {
	const t = useTranslations('LocaleSwitcher');
	const locale = useLocale();
	
	return (
		<Dropdown>
			<DropdownToggle className="px-2 mx-1 px-sm-3 mx-sm-0" as={NavLink} bsPrefix="hide-caret" id="dropdown-locale">
				<FontAwesomeIcon icon={faGlobe} size="lg" />
			</DropdownToggle>
			<HeaderLocaleSelect defaultValue={locale} >
				{routing.locales.map((cur) => (
					<option key={cur} value={cur}>
					{t('locale', {locale: cur})}
					</option>
				))}
			</HeaderLocaleSelect>
		</Dropdown>
	)
}
