import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";

function SignupScreen() {
  const aunthenticateCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function singupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const results = await createUser(email, password);
      aunthenticateCtx.authenticate(results.idToken);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not Create user, please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating User..."} />;
  }

  return <AuthContent onAuthenticate={singupHandler} />;
}

export default SignupScreen;
