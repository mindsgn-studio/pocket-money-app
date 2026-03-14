import { View, TextInput, StyleSheet } from "react-native";
import { SendMethod } from "@/@src/types/send";

export default function RecipientInput({
  method,
  value,
  onChange,
}: {
  method: SendMethod;
  value: string;
  onChange: (v: string) => void;
}) {
  let placeholder = "Recipient";

  if (method === "ethereum") placeholder = "0x...";
  if (method === "phone") placeholder = "+27...";
  if (method === "email") placeholder = "email@example.com";

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
});