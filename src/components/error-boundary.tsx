import { Component, PropsWithChildren } from 'react';
import { Container } from './layout/container';
import { Typography } from './ui/typography';
import { text } from '../lib/text.ts';

export class ErrorBoundary extends Component<
  PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-dark w-full flex items-center">
          <Container>
            <Typography className="mt-10" variant="h4">
              {text.applicationError}
            </Typography>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}
