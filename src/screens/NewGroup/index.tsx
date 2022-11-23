import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';

import { Container, Content, Icon } from './styles';
import { useState } from 'react';

type NewGroupProps = {

}

type Group = {
  name: string;
}

export function NewGroup({ }: NewGroupProps) {
  const [group, setGroup] = useState<Group>({} as Group);

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
        />

        <Button
          title='Criar'
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
