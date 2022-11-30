import { TouchableOpacityProps } from "react-native";

import { ButtonIcon } from "@components/ButtonIcon";

import { Container, Name, Icon } from './styles';

type PlayerCardProps = TouchableOpacityProps & {
    name: string;
    onRemove: () => void;
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
    return (
        <Container>
            <Icon name="person" />
            <Name>
                {name}
            </Name>
            <ButtonIcon
                icon="close"
                type="SECONDARY"
                onPress={onRemove}
            />
        </Container>
    );
}
