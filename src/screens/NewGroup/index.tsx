import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Input } from '@components/Input';
import { AppError } from '@utils/AppError';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { createGroup } from '@storage/group/groupCreate';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const [group, setGroup] = useState<string>('');
  const navigation = useNavigation();

  async function handlePlayers() {
    try {

      if (group.trim().length === 0) {
        Alert.alert("Novo Grupo", "Informe o nome da turma.");
      }

      await createGroup(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.");
      }
    }

  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title='Nova Turma'
          subTitle='crie uma turma para adicionar pessoas'
        />

        <Input
          placeholder='Nome da turma'
          value={group}
          onChangeText={setGroup}
        />

        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handlePlayers}
        />
      </Content>
    </Container>
  );
}
