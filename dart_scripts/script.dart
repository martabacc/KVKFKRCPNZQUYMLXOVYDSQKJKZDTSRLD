import 'package:totp/totp.dart';

void main() {
  final totp = Totp.fromBase32(
    secret: 'xxx',
    algorithm: Algorithm.sha1,
    digits: 6,
    period: 120,
  );

  print(totp.now());
}
