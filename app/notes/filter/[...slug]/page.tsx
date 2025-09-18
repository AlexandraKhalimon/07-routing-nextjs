import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';


interface NotesParams {
    params: Promise<{ slug: string[] }>;
};

export default async function NotesByTag({ params }: NotesParams) {
    const { slug } = await params;
    const tag = slug[0] === 'All' ? undefined : slug[0];

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', { search: "", page: 1, perPage: 12, tag }],
        queryFn: () => fetchNotes({ search: "", page: 1, perPage: 12, tag })
    });
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={ tag } />
        </HydrationBoundary>
    );
};