import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcrypt';

import { Role } from '../src/generated/prisma/enums';

async function main() {
  console.log(' Starting database seeding...');

  // Clean up any existing data safely to prevent duplicates/foreign key issues
  await prisma.auditLog.deleteMany({});
  await prisma.saleItem.deleteMany({});
  await prisma.sale.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.paymentMethod.deleteMany({});
  await prisma.auditAction.deleteMany({});

  //Create the default system Audit Actions 
  console.log('Inserting default audit actions...');
  const createAction = await prisma.auditAction.create({ data: { Action: 'CREATE' } });
  const updateAction = await prisma.auditAction.create({ data: { Action: 'UPDATE' } });
  const deleteAction = await prisma.auditAction.create({ data: { Action: 'DELETE' } });
  const loginAction = await prisma.auditAction.create({ data: { Action: 'LOGIN' } });

  // 3. Create default Payment Methods 
  console.log('Inserting default payment methods...');
  await prisma.paymentMethod.create({ data: { paymentMethod: 'CASH' } });
  await prisma.paymentMethod.create({ data: { paymentMethod: 'CHAPA' } });
  await prisma.paymentMethod.create({ data: { paymentMethod: 'CBE_BIRR' } });
  await prisma.paymentMethod.create({ data: { paymentMethod: 'BANK_TRANSFER' } });

  // password for the Admin
  const hashedPassword = await bcrypt.hash('Admin@2026', 10);

  // Create the Super Admin User and their Profile
  console.log('Creating Super Admin account...');
  const adminUser = await prisma.user.create({
    data: {
      username: 'superadmin',
      email: 'admin@ekatrack.com',
      password: hashedPassword,
      role: Role.ADMIN,
      profile: {
        create: {
          firstName: 'System',
          lastName: 'Administrator',
          phoneNumber: '+251911223344',
          gender: 'Male'
        }
      }
    }
  });
  // Log the initial system creation event
  await prisma.auditLog.create({
    data: {
      details: 'System initialized and Super Admin created via seed script.',
      userId: adminUser.id,
      auditActionId: loginAction.id,
      
    }
  });

  console.log('Seeding completed successfully!');
  console.log(`
    Admin Credentials:
   Email:    admin@ekatrack.com
   Password: Admin@2026
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });