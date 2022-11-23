import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { Header } from '@components/Header';

import { Container } from './styles';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([
    'Galera da Rocket!',
    'Amigos',
    'Família'
  ]);

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subTitle='jogue com a sua turma' />

      <FlatList
        data={groups}
        renderItem={({ item, index }) => {
          return (
            <GroupCard
              key={index}
              title={item}
              onPress={() => console.log(item)}
            />
          )
        }}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <ListEmpty message='Que tal cadastrar a primeira turma?' />
        }
      />
      <Button title='Criar nova turma' />
    </Container>
  );
}
