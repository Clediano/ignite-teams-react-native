import { useState } from 'react';
import { FlatList } from 'react-native';

import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { Filter } from '@components/Filter';
import { Input } from '@components/Input';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Button } from '@components/Button';

type PlayersProps = {
}

export function Players({ }: PlayersProps) {
    const [team, setTeam] = useState('time b');
    const [players, setPlayers] = useState([
        'Clediano', 'Cleiton', 'Dani', 'Gih', 'Mãe', 'Pai',
        'Clediano', 'Cleiton', 'Dani', 'Gih', 'Mãe', 'Pai',
        'Clediano', 'Cleiton', 'Dani', 'Gih', 'Mãe', 'Pai',
    ]);

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title='Nome da turma'
                subTitle='adicione a galera e separe os times'
            />

            <Form>
                <Input placeholder='Nome da pessoa' autoCorrect={false} />

                <ButtonIcon icon='add' />
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
            
            <FlatList
                data={players}
                renderItem={({ item, index }) => (
                    <PlayerCard
                        key={index}
                        name={item}
                        onRemove={() => console.log(item)}
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
            />

            <Button
                title="Remover turma"
                type="SECONDARY"
                style={{ marginTop: 25 }}
                onPress={() => console.log("cliquei")}
            />

        </Container>
    );
}
