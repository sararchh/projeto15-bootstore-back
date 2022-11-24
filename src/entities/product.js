import * as Yup from 'yup';

const productSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  image: Yup.string().required('Imagem é obrigatório'),
  description: Yup.string().required('Descrição é obrigatório'),
  price: Yup.number().required('Valor é obrigatório'),
  category: Yup.string().required('Categoria é obrigatório')
});

export default productSchema;