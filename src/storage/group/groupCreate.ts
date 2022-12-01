import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';
import { getAllGroups } from './groupGetAll';
import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function createGroup(newGroup: string) {
    try {

        const storedGroups = await getAllGroups();

        const groupAlreadyExists = storedGroups.includes(newGroup);

        if (groupAlreadyExists) {
            throw new AppError("Já existe um grupo cadastrado com esse nome.");
        }

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([...storedGroups, newGroup]));
    } catch (error) {
        throw error;
    }
}
