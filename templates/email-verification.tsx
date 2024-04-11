import { DOMAIN_URL } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button } from '@react-email/components'

interface EmailVerificationProps {
  username: string;
  verifyCode: string;
}

const EmailVerificationTemplate = ({username, verifyCode} : EmailVerificationProps) => {
  return (
    <Html lang="en" dir='ltr'>
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily='Roboto'
          fallbackFontFamily="Verdana"
          // webFont={{
          //   url: "",
          //   format: "woff2"
          // }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>Here&apos; your verification code</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username}</Heading>
        </Row>
        <Row>
          <Text>Thank you for registering. Please use the fallowing verification code to complete your registration:</Text>
        </Row>
        <Row>
          <Text>{verifyCode}</Text>
        </Row>
        <Row>
          <Text>If you did not requested this code, please ignore this email.</Text>
        </Row>
        <Row>
          <Button 
            href={DOMAIN_URL}
            style={{color: COLORS.skyBlue}}
            >
            Verify here
          </Button>
        </Row>
      </Section>
    </Html>
  );
}

export default EmailVerificationTemplate;
