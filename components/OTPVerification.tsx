import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Button } from './ui/button';
import { Text } from './ui/text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useSession } from '../utils/ctx';

interface OTPVerificationProps {
    email: string;
    onVerificationSuccess: () => void;
    onBack: () => void;
}

export default function OTPVerification({ email, onVerificationSuccess, onBack }: OTPVerificationProps) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const { verifyOTP: verifyOTPFromContext, resendOTP: resendOTPFromContext } = useSession();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) return; // Prevent multiple characters

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            Alert.alert('Invalid OTP', 'Please enter a 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const { error } = await verifyOTPFromContext(email, otpCode);

            if (error) {
                Alert.alert('Verification Failed', error);
            } else {
                Alert.alert('Success', 'Your account has been verified!');
                onVerificationSuccess();
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResendLoading(true);
        try {
            const { error } = await resendOTPFromContext(email);

            if (error) {
                Alert.alert('Resend Failed', error);
            } else {
                Alert.alert('Success', 'A new verification code has been sent to your email');
                setTimer(60);
                setCanResend(false);
                setOtp(['', '', '', '', '', '']); // Clear current OTP
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to resend OTP');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                    Verify Your Email
                </CardTitle>
                <CardDescription className="text-center">
                    We've sent a 6-digit verification code to{'\n'}
                    <Text className="font-medium text-foreground">{email}</Text>
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* OTP Input Fields */}
                <View className="flex-row justify-center space-x-3">
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputRefs.current[index] = ref;
                            }}
                            className="w-12 h-12 text-center text-xl font-semibold border border-border rounded-lg bg-background text-foreground"
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            selectTextOnFocus
                            autoFocus={index === 0}
                        />
                    ))}
                </View>

                {/* Verify Button */}
                <Button
                    onPress={handleVerifyOTP}
                    disabled={loading || otp.join('').length !== 6}
                    className="h-12"
                    size="lg"
                >
                    <Text className={loading ? "opacity-70" : ""}>
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </Text>
                </Button>

                {/* Resend Code */}
                <View className="items-center space-y-2">
                    <Text className="text-sm text-muted-foreground">
                        Didn't receive the code?
                    </Text>

                    {canResend ? (
                        <Button
                            variant="ghost"
                            onPress={handleResendOTP}
                            disabled={resendLoading}
                            className="h-10"
                        >
                            <Text className="text-primary">
                                {resendLoading ? 'Sending...' : 'Resend Code'}
                            </Text>
                        </Button>
                    ) : (
                        <Text className="text-sm text-muted-foreground">
                            Resend available in {timer}s
                        </Text>
                    )}
                </View>

                {/* Back Button */}
                <Button
                    variant="outline"
                    onPress={onBack}
                    disabled={loading}
                    className="h-12 mt-4"
                >
                    <Text>
                        ← Back to Sign Up
                    </Text>
                </Button>
            </CardContent>
        </Card>
    );
}
