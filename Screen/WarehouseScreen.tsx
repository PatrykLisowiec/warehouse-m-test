import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CreateInventory, GetInventory } from "./Service";

const WarehouseScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const [EAN, onEANChange] = useState("");
  const [Desc, onDescChange] = useState("");
  const [WarehouseLocation, onWarehouseLocationChange] = useState("");
  const [Quantity, onQuantityScanned] = useState("");

  useEffect(() => {
    console.log(isFocused);
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, [isFocused]);

  const handleBarCodeScanned = async ({ type, data }: { type: any; data: any }) => {
    setScanned(true);
    await GetInventory(data).then((result) => { 
      if (result) {
        onDescChange(result.Description);
        onWarehouseLocationChange(result.Location);
        onQuantityScanned(result.Quantity);
      }
    });
    setScanned(true);
    onEANChange(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const AddInventory = async () => { 
   await CreateInventory(EAN, Quantity, Desc, WarehouseLocation).then(() => {
      Alert.alert("Artikel skappad");
      onEANChange("");
      onDescChange("");
      onWarehouseLocationChange("");
      onQuantityScanned("");
      setScanned(false);
    });

  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        {isFocused && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>
      {scanned && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
              placeholder="EAN"
              onChangeText={onEANChange}
              value={EAN}
              style={styles.input}
              autoCorrect={true}
            />
            <TextInput
              placeholder="Namn på artikel"
              onChangeText={onDescChange}
              value={Desc}
              style={styles.input}
              autoCorrect={true}
            />
            <TextInput
              placeholder="Lager plats"
              onChangeText={onWarehouseLocationChange}
              value={WarehouseLocation}
              style={styles.input}
              autoCorrect={true}
            />
            <TextInput
              placeholder="Antal"
              onChangeText={onQuantityScanned}
              value={Quantity}
              style={styles.input}
              autoCorrect={true}
            />
            <Button
            title={"Spara"}
            onPress={() => AddInventory()}
          />
          <Button
            title={"Skanna igen / Avbröt"}
            onPress={() => setScanned(false)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    height: 400,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "70%",
    height: 50,
  },
});

export default WarehouseScreen;
