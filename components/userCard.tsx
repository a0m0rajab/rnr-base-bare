import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import { Text } from './ui/text';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function UserCard() {
    return (
        <Link href={{
            pathname: "/users/test",
            // params: { id: 'test' }
        }} className='w-full max-w-sm' asChild>
            <TouchableOpacity>
                <Card className='w-full max-w-sm'>
                    <CardHeader>
                        <CardTitle>Ahmet Kaya</CardTitle>
                        <CardDescription>Fatih - Level 1</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Avatar alt="Zach Nugent's Avatar">
                            <AvatarImage source={{ uri: "https://github.com/a0m0rajab.png" }} />
                            <AvatarFallback>
                                <Text>ZN</Text>
                            </AvatarFallback>
                        </Avatar>
                    </CardContent>
                    <CardFooter>
                        <Text>Card Footer</Text>
                    </CardFooter>
                </Card>
            </TouchableOpacity>
        </Link>

    );
}