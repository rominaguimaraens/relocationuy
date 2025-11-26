import { useParams } from 'react-router-dom';
import Blog from './Blog';
import { slugToCategoryLabel } from '../lib/blogCategories';

export default function BlogCategory() {
  const { category } = useParams();
  const resolved = slugToCategoryLabel(category);

  return <Blog initialCategory={resolved ?? 'All'} />;
}
