
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.CategoriesScalarFieldEnum = {
  id: 'id',
  title: 'title'
};

exports.Prisma.AuthorsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  keywords: 'keywords'
};

exports.Prisma.ComicsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  image: 'image',
  keywords: 'keywords',
  status: 'status',
  price: 'price',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.VolumesScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  price: 'price',
  comicId: 'comicId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChaptersScalarFieldEnum = {
  id: 'id',
  title: 'title',
  filePath: 'filePath',
  content: 'content',
  price: 'price',
  lock: 'lock',
  volumeId: 'volumeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RolesScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description'
};

exports.Prisma.UsersScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDisabled: 'isDisabled'
};

exports.Prisma.FavoritesScalarFieldEnum = {
  userId: 'userId',
  comicId: 'comicId',
  addedAt: 'addedAt'
};

exports.Prisma.RatesScalarFieldEnum = {
  userId: 'userId',
  comicId: 'comicId',
  score: 'score',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.ErrorsScalarFieldEnum = {
  userId: 'userId',
  chapterId: 'chapterId',
  content: 'content',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ViewsScalarFieldEnum = {
  userId: 'userId',
  comicId: 'comicId',
  chapterId: 'chapterId',
  lastedAt: 'lastedAt'
};

exports.Prisma.CommentsScalarFieldEnum = {
  id: 'id',
  content: 'content',
  userId: 'userId',
  chapterId: 'chapterId',
  comicId: 'comicId',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  commentId: 'commentId',
  content: 'content',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.WalletsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  value: 'value',
  updatedAt: 'updatedAt'
};

exports.Prisma.TransactionsScalarFieldEnum = {
  id: 'id',
  walletId: 'walletId',
  amount: 'amount',
  description: 'description',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.Unlock_comicScalarFieldEnum = {
  userId: 'userId',
  comicId: 'comicId',
  transactionId: 'transactionId',
  createdAt: 'createdAt'
};

exports.Prisma.Unlock_volumeScalarFieldEnum = {
  userId: 'userId',
  volumeId: 'volumeId',
  transactionId: 'transactionId',
  createdAt: 'createdAt'
};

exports.Prisma.Unlock_chapterScalarFieldEnum = {
  userId: 'userId',
  chapterId: 'chapterId',
  transactionId: 'transactionId',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.CategoriesOrderByRelevanceFieldEnum = {
  title: 'title'
};

exports.Prisma.AuthorsOrderByRelevanceFieldEnum = {
  name: 'name',
  description: 'description',
  keywords: 'keywords'
};

exports.Prisma.ComicsOrderByRelevanceFieldEnum = {
  title: 'title',
  description: 'description',
  image: 'image',
  keywords: 'keywords',
  status: 'status'
};

exports.Prisma.VolumesOrderByRelevanceFieldEnum = {
  title: 'title',
  description: 'description'
};

exports.Prisma.ChaptersOrderByRelevanceFieldEnum = {
  title: 'title',
  filePath: 'filePath',
  content: 'content'
};

exports.Prisma.RolesOrderByRelevanceFieldEnum = {
  title: 'title',
  description: 'description'
};

exports.Prisma.UsersOrderByRelevanceFieldEnum = {
  name: 'name',
  email: 'email',
  password: 'password',
  description: 'description'
};

exports.Prisma.RatesOrderByRelevanceFieldEnum = {
  content: 'content'
};

exports.Prisma.ErrorsOrderByRelevanceFieldEnum = {
  content: 'content',
  status: 'status'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.CommentsOrderByRelevanceFieldEnum = {
  content: 'content'
};

exports.Prisma.NotificationsOrderByRelevanceFieldEnum = {
  content: 'content'
};

exports.Prisma.TransactionsOrderByRelevanceFieldEnum = {
  description: 'description',
  status: 'status'
};


exports.Prisma.ModelName = {
  Categories: 'Categories',
  Authors: 'Authors',
  Comics: 'Comics',
  Volumes: 'Volumes',
  Chapters: 'Chapters',
  Roles: 'Roles',
  Users: 'Users',
  Favorites: 'Favorites',
  Rates: 'Rates',
  Errors: 'Errors',
  Views: 'Views',
  Comments: 'Comments',
  Notifications: 'Notifications',
  Wallets: 'Wallets',
  Transactions: 'Transactions',
  Unlock_comic: 'Unlock_comic',
  Unlock_volume: 'Unlock_volume',
  Unlock_chapter: 'Unlock_chapter'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
