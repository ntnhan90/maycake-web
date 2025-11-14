import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductLabelsModels } from '@/models/productLabelsModels'
import THSort from '@/components/TableSort/THSort'
import PokemonTypeLabel from '@/components/Page/Pokemon/PokemonTypeLabel'
import useDictionary from '@/locales/dictionary-hook'

type Props = {
  label: ProductLabelsModels[];
}

export default function PokemonList(props: Props) {
    const { label } = props
    const dict = useDictionary()

    return (
        <Table responsive bordered hover>
            <thead>
                <tr className="table-light dark:table-dark">
                <th><THSort name="id">#</THSort></th>
                <th aria-label="Photo" />
                <th><THSort name="name">{dict.pokemons.attribute.name}</THSort></th>
                <th>{dict.pokemons.attribute.type}</th>
                <th className="text-center">{dict.pokemons.attribute.egg_group}</th>
                <th className="text-end"><THSort name="hp">{dict.pokemons.attribute.hp}</THSort></th>
                <th className="text-end"><THSort name="attack">{dict.pokemons.attribute.attack}</THSort></th>
                <th className="text-end"><THSort name="defense">{dict.pokemons.attribute.defense}</THSort></th>
                <th className="text-end"><THSort name="special_attack">{dict.pokemons.attribute.sp_attack}</THSort></th>
                <th className="text-end"><THSort name="special_defense">{dict.pokemons.attribute.sp_defense}</THSort></th>
                <th className="text-end"><THSort name="speed">{dict.pokemons.attribute.speed}</THSort></th>
                <th className="text-end"><THSort name="total">{dict.pokemons.attribute.total}</THSort></th>
                <th aria-label="Action" />
                </tr>
            </thead>
            <tbody>
            
            </tbody>
        </Table>
    )
}
