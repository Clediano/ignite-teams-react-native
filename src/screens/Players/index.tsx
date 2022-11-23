import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { Container } from './styles';

type PlayersProps = {
}

export function Players({ }: PlayersProps) {

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title='Nome da turma'
                subTitle='adicione a galera e separe os times'
            />
        </Container>
    );
}
