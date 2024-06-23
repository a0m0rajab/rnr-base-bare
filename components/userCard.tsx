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

type UserCardProps = {name: string, role: string, avatar: string, id: string};

export default function UserCard({name, role, avatar, id}: UserCardProps) {
    return (
        <Link href={{
            pathname: "/users/[id]",
            params: { id: id
             }
        }} className='w-full max-w-sm p-0' asChild>
            <TouchableOpacity>
                <Card className='w-full max-w-sm shadow-none p-0'>
                    <CardContent className='flex-row align-center justify-left p-0 pl-2'>
                        <View className='flex-col align-center justify-center'> 
                            <Avatar alt="Avatar">
                                <AvatarImage source={{ uri: avatar }} />
                                <AvatarFallback>
                                    <Text>{name?.slice(0,2)}</Text>
                                </AvatarFallback>
                            </Avatar>
                        </View>
                        <View className='flex-col'>
                            <CardHeader>
                                <CardTitle>
                                    <Text>{name}</Text>
                                </CardTitle>
                                <CardDescription>
                                    <Text>{role}</Text>
                                </CardDescription>
                            </CardHeader>
                        </View>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        </Link>

    );
}