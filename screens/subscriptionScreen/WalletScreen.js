import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Wallet from "../../components/subscription/Wallet";
import { useSelector } from "react-redux";
import GOHLoader from "../../commonComponents/GOHLoader";

const WalletScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state) => state.profile.profile);
  const membership = useSelector((state) => state.membership.membership);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${SERVER_URL}/membership/getRecentTransactions`,
          {
            phone: profile.phoneNumber,
          }
        );
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error in getting transaction ==>", error);
      }
    };
    getTransactions();
  }, [membership]);
  return (
    <>
      {loading && <GOHLoader />}
      {!loading && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Wallet transactions={transactions} />
        </SafeAreaView>
      )}
    </>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({});
