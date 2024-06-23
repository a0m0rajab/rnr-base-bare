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
        }} className='w-full max-w-sm p-0' asChild>
            <TouchableOpacity>
                <Card className='w-full max-w-sm shadow-none p-0'>
                    <CardContent className='flex-row align-center justify-left p-0 pl-2'>
                        <View className='flex-col align-center justify-center'> 
                            <Avatar alt="Zach Nugent's Avatar">
                                <AvatarImage source={{ uri: "https://github.com/a0m0rajab.png" }} />
                                <AvatarFallback>
                                    <Text>ZN</Text>
                                </AvatarFallback>
                            </Avatar>
                        </View>
                        <View className='flex-col'>
                            <CardHeader>
                                <CardTitle>
                                    <Text>Zach Nugent</Text>
                                </CardTitle>
                                <CardDescription>
                                    <Text>Software Engineer</Text>
                                </CardDescription>
                            </CardHeader>
                        </View>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        </Link>

    );
}