/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config({
  path: `./.env.${process.env.NEXT_PUBLIC_ENV || 'dev'}`,
});

module.exports = {
  env: localEnv,
};
