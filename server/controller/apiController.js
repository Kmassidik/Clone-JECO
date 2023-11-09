const { Bcrypt } = require("../helpers/bycrpt");
const { Jsonwebtoken } = require("../helpers/jwt");
const { User, Item, Category, Ingredient, sequelize } = require("../models");
class ApiController {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      
      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }

      let respond = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!respond) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      let checkPassword = Bcrypt.checkPassword(password, respond.password);

      if (!checkPassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      let getToken = Jsonwebtoken.getJWT({
        id: respond.id,
        email: respond.email,
      });

      res.status(200).json({ access_token: getToken });
    } catch (error) {
      next(error);
    }
  }
  static async addNewAdmin(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      console.log(req.body);
      let respond = await User.create({
        username,
        username,
        email: email,
        password: password,
        role: "admin",
        phoneNumber: phoneNumber,
        address: address,
      });

      res.status(201).json(respond);
    } catch (error) {
      next(error);
    }
  }
  // category
  static async getAllCategory(req, res, next) {
    try {
      let responses = await Category.findAll();

      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async addNewCategory(req, res, next) {
    try {
      let { name } = req.body;
      let responses = await Category.create({ name: name });

      res.status(201).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async getCategoryById(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await Category.findByPk(id);

      if (!responses) {
        throw { name: "NotFound", message: "Category not found" };
      }

      res.status(201).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async editCategoryById(req, res, next) {
    try {
      let { name } = req.body;
      let { id } = req.params;
      let responses = await Category.findByPk(id);

      if (!responses) {
        throw { name: "NotFound", message: "Category not found" };
      }

      let responsesEdit = await responses.update({ name: name });

      res.status(201).json(responsesEdit);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await Category.findByPk(id);

      if (!responses) {
        throw { name: "NotFound", message: "Category not found" };
      }

      await responses.destroy();

      res.status(201).json(`this category: ${responses.name} has been delete`);
    } catch (error) {
      next(error);
    }
  }
  // item
  static async getAllItem(req, res, next) {
    try {
      let responses = await Item.findAll({
        include: [
          {
            model: Ingredient,
          },
          {
            model: Category,
          },
        ],
      });
      responses = responses.map((element) => {
        element.dataValues.ingredientsLength = element.Ingredients.length;
        return element;
      });

      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async addNewItem(req, res, next) {
    console.log(req.body, "ini datanyaaa");
    let transaction = await sequelize.transaction();

    try {
      let { name, description, price, imgUrl, category, ingredients } =
        req.body;
      let { id } = req.user;
      let newItem = await Item.create(
        {
          name: name,
          description: description,
          price: price,
          imgUrl: imgUrl,
          authorId: id,
          categoryId: category,
        },
        { transaction: transaction }
      );

      let dataIngradient = ingredients.map((e) => ({
        name: e.name,
        imageUrl: e.imageUrl,
        itemId: newItem.id,
      }));

      let newIngredient = await Ingredient.bulkCreate(dataIngradient, {
        transaction: transaction,
      });

      await transaction.commit();

      res.status(201).json({ newItem, newIngredient });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }
  static async getItemById(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await Item.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Ingredient,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      if (!responses) {
        throw { name: "NotFound", message: `Items by ${id} not found!` };
      }
      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async updateItemById(req, res, next) {
    try {
      const result = await sequelize.transaction(async (transaction) => {
        const { name, description, price, imgUrl, category, ingredients } =
          req.body;
        const { id } = req.params;

        const getItem = await Item.findByPk(id, {
          include: {
            model: Ingredient,
          },
          transaction: transaction,
        });

        if (!getItem) {
          throw { name: "NotFound", message: "Data item not found!" };
        }

        await getItem.update({
          name: name,
          description: description,
          price: price,
          imgUrl: imgUrl,
          categoryId: category,
        });

        if (ingredients && ingredients.length > 0) {
          for (const ingredientData of ingredients) {
            const [ingredient, created] = await Ingredient.findOrCreate({
              where: { id: ingredientData.id },
              defaults: ingredientData,
              transaction: transaction,
            });

            if (!created) {
              await ingredient.update(ingredientData);
            }

            await getItem.addIngredient(ingredient, {
              transaction: transaction,
            });
          }
        }
        return getItem;
      });

      res.status(200).json({ result, message: "Your data has been updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteItemById(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await Item.findByPk(id);

      if (!responses) {
        throw { name: "NotFound", message: "Data item not found!" };
      }

      await responses.destroy();
      res.status(200).json(`Your Item: ${responses.name} has been deleted`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ApiController,
};
