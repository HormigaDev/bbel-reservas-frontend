'use client';

import makeStyles from '@/utils/MakeStyles';
import entries from '@/app/menu/entries.json';
import principals from './principals.json';
import desserts from './desserts.json';
import Item from '@/components/ui/Item';
import Grid from './components/Grid';
import { useState } from 'react';

export default function Menu() {
    const [tab, setTab] = useState('entries');

    return (
        <div>
            <div
                className={makeStyles([
                    'w-screen',
                    'h-screen',
                    'grid',
                    'grid-cols-[20%_80%]',
                    'overflow-hidden',
                ])}
            >
                <div className={makeStyles(['text-burgundy bg-marfil pt-16'])}>
                    <Item color="burgundy" onClick={() => setTab('entries')}>
                        Entradas
                    </Item>
                    <Item color="burgundy" onClick={() => setTab('principals')}>
                        Platos principales
                    </Item>
                    <Item color="burgundy" onClick={() => setTab('desserts')}>
                        Postres
                    </Item>
                </div>
                <div className="text-burgundy">
                    {tab === 'entries' && <Grid data={entries} />}
                    {tab === 'principals' && <Grid data={principals} />}
                    {tab === 'desserts' && <Grid data={desserts} />}
                </div>
            </div>
        </div>
    );
}
