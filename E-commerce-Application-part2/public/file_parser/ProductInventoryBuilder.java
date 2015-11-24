import java.sql.*;

public class ProductInventoryBuilder {
   
   static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
   static final String DB_URL = "jdbc:mysql://localhost/ecommerce";
   static final String USER = "root";
   static final String PASS = "12312312";
   
   public static void main(String[] args) {
   Connection conn = null;
   Statement stmt = null;
   try{
      Class.forName("com.mysql.jdbc.Driver");
      conn = DriverManager.getConnection(DB_URL, USER, PASS);
      System.out.println("Connection successful");
      System.out.println("Inserting records");
      stmt = conn.createStatement();
      
      String sql;
      int count =542681;
      
      for(int i=0;i<count;i++) {
    	  int temp = i+1;
    	  sql = "INSERT INTO product_inventory_information " +
                  "VALUES ('"+temp+"',5)";
    	  stmt.executeUpdate(sql);    	  
      }
      
      System.out.println("Inserted records into the table...");

   }catch(SQLException se){
      //Handle errors for JDBC
      se.printStackTrace();
   }catch(Exception e){
      //Handle errors for Class.forName
      e.printStackTrace();
   }finally{
      //finally block used to close resources
      try{
         if(stmt!=null)
            conn.close();
      }catch(SQLException se){
      }// do nothing
      try{
         if(conn!=null)
            conn.close();
      }catch(SQLException se){
         se.printStackTrace();
      }//end finally try
   }//end try
   System.out.println("Goodbye!");
}
}//end JDBCExample