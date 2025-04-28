import { saqSets } from '$lib/data/questions';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
    // Get the time parameter from the URL, default to 40 minutes
    const timeParam = url.searchParams.get('time');
    const timeInMinutes = timeParam ? parseInt(timeParam, 10) : 40;

    // Get the set parameter from the URL, default to 0 (first set)
    const setParam = url.searchParams.get('set');
    const setIndex = setParam ? parseInt(setParam, 10) : 0;

    // Make sure the set index is valid
    const validSetIndex = setIndex >= 0 && setIndex < saqSets.length ? setIndex : 0;

    // Get the selected SAQ set
    const selectedSet = saqSets[validSetIndex];

    return {
        selectedSet,
        timeInMinutes,
        setIndex: validSetIndex
    };
}
