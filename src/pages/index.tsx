import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ProductCard } from '../componets'
import products from '../data/data.json'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
const Home: NextPage = (props: any) => {
  const { t } = useTranslation()
  console.log(t("welcome"))
  return (
    <>
      <Head>
        <title>AMAZIN | products</title>
        <meta name="description" content="List of all products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={3}>
        {products.products.map((product: any) => {
          return (
            <Grid item sm={12} md={6} xl={3} key={product.name}>
              <ProductCard product={product} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home']))
    }
  }
}
export default Home
