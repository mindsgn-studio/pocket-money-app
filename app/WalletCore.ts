import { NativeModules } from 'react-native';

const { WalletCore } = NativeModules;

interface WalletCoreInterface {
  helloWorld(): Promise<string>;
}

export default WalletCore as WalletCoreInterface;
