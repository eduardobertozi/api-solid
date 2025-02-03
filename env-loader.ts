import fs from 'fs'
import path from 'path'

/**
 * Loads environment variables from a specified file into `process.env`.
 *
 * @param filePath - The path to the environment file. Defaults to '.env'.
 *
 * This function reads the specified environment file, parses its contents,
 * and sets the corresponding key-value pairs in `process.env`. If the file
 * does not exist, the function does nothing.
 *
 * @example
 * ```typescript
 * loadEnv(); // Loads environment variables from the default '.env' file
 * loadEnv('config.env'); // Loads environment variables from 'config.env' file
 * ```
 */
export function loadEnv(filePath: string = '.env') {
  const envPath = path.resolve(process.cwd(), filePath)

  if (!fs.existsSync(envPath)) return

  const envFile = fs.readFileSync(envPath, 'utf-8')

  envFile.split('\n').forEach((line) => {
    const [key, value] = line.split('=')
    if (key && value) {
      process.env[key.trim()] = value.trim()
    }
  })
}
