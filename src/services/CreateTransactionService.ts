import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

//Interface para formatar o tipo de dados recebido
interface Request {
  title: string,
  value: number,
  type: 'income'|'outcome';
}
//Service: Armazena a regra de negócio da aplicação
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    const {total}= this.transactionsRepository.getBalance();

    if(type==="outcome" && total<value){
      throw new Error("No enough cash, stranger");
    }
    
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
