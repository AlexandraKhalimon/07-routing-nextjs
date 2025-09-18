import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { fetchNotes } from '@/lib/api';

export default async function SidebarNotes() {
    
    const notesResponse = await fetchNotes({
        search: '',
        page: 1,
        perPage: 12,
        tag: undefined,
    });
    const allTags = notesResponse.notes.map((note) => note.tag);
    const noteTags = allTags.filter((tag, index, allTags) => allTags.indexOf(tag) === index);
    const tags = ['All notes', ...noteTags];
    
    return (
        <ul className={css.menuList}>
            {/* список тегів */}
            {tags.map((tag, index) => (
            <li className={css.menuItem} key={index}>
                    <Link href={`/notes/filter/${tag === 'All notes' ? 'all': tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
            ))}   
        </ul>
    );
}