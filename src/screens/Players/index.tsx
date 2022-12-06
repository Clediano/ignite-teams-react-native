import { useState, useEffect, useRef } from 'react';
import { FlatList, Alert, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from '@components/Highlight';
import { Loading } from '@components/Loading';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Filter } from '@components/Filter';
import { Input } from '@components/Input';

import { getPlayerByGroupAndTeam } from '@storage/players/playerGetByGroupAndTeam';
import { removePlayerByGroup } from '@storage/players/playerRemoveByGroup';
import { addPlayerByGroup } from '@storage/players/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';
import { removeGroup } from '@storage/group/groupRemoveByName';
import { AppError } from '@utils/AppError';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
    group: string;
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState('time a');
    const [newPlayerName, setNewPlayerName] = useState('');

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const newPlayerNameInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();


    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert("Nova Pessoa", "Informe o nome da pessoa para adicionar.");
        }

        const newPlayer = {
            name: newPlayerName,
            team: team
        } as PlayerStorageDTO;

        try {
            await addPlayerByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');
            fetchPlayersByTeam();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Nova Pessoa", error.message);
            } else {
                console.error(error);
                Alert.alert("Nova Pessoa", "Não foi possível adicionar.");
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);
            const playersByTeam = await getPlayerByGroupAndTeam(group, team);

            setPlayers(playersByTeam);
        } catch (error) {
            console.error(error);
            Alert.alert("Nova Pessoa", "Não foi possível carregar as pessoas do time.");
        } finally {
            setIsLoading(false);
          }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await removePlayerByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            console.error(error);
            Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.");
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover a turma?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() },
            ]
        );
    }

    async function groupRemove() {
        try {
            await removeGroup(group);
            navigation.navigate("groups");
        } catch (error) {
            console.error(error);
            Alert.alert("Remover grupo", "Não foi possível remover o grupo.");
        }
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}
                subTitle='adicione a galera e separe os times'
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder='Nome da pessoa'
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon
                    icon='add'
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['time a', 'time b']}
                    renderItem={({ item, index }) => (
                        <Filter
                            key={index}
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            {isLoading ? <Loading /> :
                <FlatList
                    data={players}
                    renderItem={({ item, index }) => (
                        <PlayerCard
                            key={index}
                            name={item.name}
                            onRemove={() => handlePlayerRemove(item.name)}
                        />
                    )}
                    contentContainerStyle={[
                        { paddingBottom: 25 },
                        players.length === 0 && { flex: 1 }
                    ]}
                    ListEmptyComponent={
                        <ListEmpty message='Não há pessoas nesse time' />
                    }
                    showsVerticalScrollIndicator={false}
                />}

            <Button
                title="Remover turma"
                type="SECONDARY"
                style={{ marginTop: 25 }}
                onPress={handleGroupRemove}
            />

        </Container>
    );
}
