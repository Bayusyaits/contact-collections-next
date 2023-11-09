import { Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import BookList from 'components/book/list'

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BookList
        type={'tv'}
        fetchLimit={10}
        loadMore={true}
      />
    </Container>
  )
}
