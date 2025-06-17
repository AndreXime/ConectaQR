import argon2 from 'argon2';

export default class HasherManager {
	private static HASH_SECRET = Buffer.from(process.env.ARGON2_KEY || '123');

	public static async Hash(value: string) {
		return await argon2.hash(value, {
			type: argon2.argon2id, // Tipo mais seguro
			memoryCost: 3 * 1024, // (3 * 1024 KiB) Total ~24MB
			timeCost: 3, // Iterações
			parallelism: 1, // Paralelismo mínimo para menor uso de CPU
			secret: this.HASH_SECRET,
		});
	}

	public static async verifyHash(hashedValue: string, valueAttempt: string) {
		return await argon2.verify(hashedValue, valueAttempt, {
			secret: this.HASH_SECRET,
		});
	}
}
