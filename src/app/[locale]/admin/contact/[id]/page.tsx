import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';


export default function ContactEditPage({params}: PageProps<'/[locale]'>) {
    const {locale} = use(params);

    // Enable static rendering
    setRequestLocale(locale as Locale);

    const t = useTranslations('IndexPage');

    return (
            <p className="max-w-[590px]">
           contact id
            </p>
    );
}