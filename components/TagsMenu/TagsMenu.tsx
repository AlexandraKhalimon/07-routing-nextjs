'use client'

import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';

interface TagsMenuProps {
    tags: string[];
}

export default function TagsMenu({tags}: TagsMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}>
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    {tags.map((tag, index) => (
                        <li className={css.menuItem} key={index}>
                            <Link href={`/notes/filter/${tag === 'All notes' ? 'all' : tag}`} className={css.menuLink}>
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}