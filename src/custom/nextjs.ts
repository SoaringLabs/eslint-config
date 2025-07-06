import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from '../types'
import { antfu } from '../index'

type NextjsOptions = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>

type NextjsUserConfigs = Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>

export const nextjsAntfuOptions: NextjsOptions = {
  // Format settings
  formatters: {
    css: true,
  },
  // Ignored paths
  ignores: [
    'migrations/**/*',
  ],
  isInEditor: false,

  // Configuration preferences
  lessOpinionated: true,
  nextjs: true,

  react: true,

  // Code style
  stylistic: {
    semi: true,
  },

  typescript: true,
}

export const nextjsAntfuUserConfigs: NextjsUserConfigs[] = [{
  rules: {
    'antfu/no-top-level-await': 'off', // Allow top-level await
    'node/prefer-global/process': 'off', // Allow using `process.env`
    'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    'style/brace-style': ['error', '1tbs'], // Use the default brace style
    'ts/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
  },
}]

/**
 * Create a Next.js ESLint config using the antfu factory.
 *
 * @param {NextjsOptions} customOptions - Custom options for the Next.js ESLint config.
 * @param {NextjsUserConfigs[]} customRules - Custom rules for the Next.js ESLint config.
 * @returns {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>} - The Next.js ESLint config.
 */
export function antfuNextjs(customOptions?: NextjsOptions, customRules?: NextjsUserConfigs[]): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const mergedOptions = { ...nextjsAntfuOptions, ...customOptions }
  const mergedRules = [...nextjsAntfuUserConfigs, ...(customRules || [])]

  return antfu(mergedOptions, ...mergedRules)
}
