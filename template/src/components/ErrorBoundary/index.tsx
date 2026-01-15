import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Generate unique error ID and log error to service
    console.error('Error', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      // Default fallback UI
      return (
        <View style={styles.container}>
          <Image
            source={require('@assets/images/error-illustration.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.title}>We encountered a problem</Text>
          <Text style={styles.message}>
            Sorry about that! Our team has been notified and is working on a
            fix.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={this.handleRetry}
            >
              <Text style={styles.primaryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
