import { getAllPlayersByGroup } from './playerGetAllByGroup';

export async function getPlayerByGroupAndTeam(group: string, team: string) {
    try {

        const storedPlayersByGroup = await getAllPlayersByGroup(group);

        const players = storedPlayersByGroup.filter(player => player.team === team);

        return players;
    } catch (error) {
        throw error;
    }
}
