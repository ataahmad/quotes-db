import { executeQuery } from './scriptHelpers';

const cleanDB = async (): Promise<void> => {
    try {
        await executeQuery('DELETE FROM quotes')
    } catch (err) {
        console.error('Error Clearing DB: ', err)
    }
}

cleanDB()