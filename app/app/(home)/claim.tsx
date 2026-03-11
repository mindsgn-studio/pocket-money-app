import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { BodyText, PrimaryButton, Screen, Title } from '@/@src/components/Primitives';
import { useRouter } from 'expo-router';

export default function ClaimScreen() {
  const router = useRouter();

  return (
    <Screen testID="claim-screen">
      <ScrollView contentContainerStyle={styles.container}>
        <Title>Claim Funds</Title>
        <BodyText style={styles.description}>
          Receive funds sent to your email address. This feature is coming soon.
        </BodyText>
        <BodyText style={styles.description}>
          For now, share your wallet address directly to receive payments.
        </BodyText>
        <PrimaryButton
          testID="claim-back-button"
          label="Back to Home"
          onPress={() => router.replace('/(home)')}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 16,
  },
  description: {
    lineHeight: 22,
  },
});

