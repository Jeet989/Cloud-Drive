import 'react-native-url-polyfill'
import 'react-native-get-random-values'
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';

interface Props { }
export const IpAddressContext = React.createContext<{ ipAddress: string, email: string, setIpAddress: any, setEmail: any }>({
  ipAddress: '', email: '', setIpAddress: (ip: '') => { }, setEmail: () => { }
})
const App: React.FC<Props> = (props: Props) => {
  const [ipAddress, setIpAddress] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')

  return (
    <SafeAreaView style={styles.container}>
      <IpAddressContext.Provider value={{ ipAddress, setIpAddress, email, setEmail }}>
        <RootNavigation />
      </IpAddressContext.Provider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default App;