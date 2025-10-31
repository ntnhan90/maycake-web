'use client'
import {useParams} from 'next/navigation';
import {Locale} from 'next-intl';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {usePathname, useRouter} from '@/i18n/navigation';
import {
    DropdownItem
} from 'react-bootstrap'

type Props = {
  children: ReactNode;
  defaultValue: string;
};

export default function HeaderLocaleSelect({children,defaultValue}:Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value as Locale;
            startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                {pathname, params},
                {locale: nextLocale}
            );
        });
    }

	return (
		<label>
            <select
                className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
                defaultValue={defaultValue}
                disabled={isPending}
                 onChange={onSelectChange}
                >
                {children}
            </select>
        </label>
	)
}