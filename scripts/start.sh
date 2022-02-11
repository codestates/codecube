#!/bin/bash
cd /home/ubuntu/codecube/server

export RDS_DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export RDS_DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export RDS_DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export RDS_DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export RDS_DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')

export GITHUB_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GITHUB_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GITHUB_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GITHUB_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')

export ORIGIN=$(aws ssm get-parameters --region ap-northeast-2 --names ORIGIN --query Parameters[0].Value | sed 's/"//g')

export JWT_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names JWT_KEY --query Parameters[0].Value | sed 's/"//g')
export OPEN_API=$(aws ssm get-parameters --region ap-northeast-2 --names OPEN_API --query Parameters[0].Value | sed 's/"//g')
export S3_MULTER_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names S3_MULTER_NAME --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js